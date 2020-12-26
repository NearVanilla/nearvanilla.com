use std::collections::HashMap;

use rocket::{http::{Status, hyper::header::CacheDirective}, request::Request, response::{status, NamedFile}};
use rocket_contrib::templates::Template;
use std::path::{Path, PathBuf};
use uuid::Uuid;
use serde::{Deserialize,Serialize};
use chrono::{DateTime, Utc, serde::ts_seconds};
use serde_json;

pub fn simple_template(path: String) -> Template {
    let map: HashMap<String, String> = HashMap::with_capacity(0);
    Template::render(path, map)
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct HighScores {
    #[serde(alias = "UUID")]
    uuid: Vec<UserUUIDEntry>,
    #[serde(with = "floating_ts")]
    timestamp: DateTime<Utc>,
    scores: HashMap<String, ScoresEntry>,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct UserUUIDEntry {
    #[serde(alias = "UUID")]
    uuid: Uuid,
    #[serde(alias = "lastKnownName")]
    name: String,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct ScoresEntry {
    #[serde(alias = "DisplayName")]
    name: String,
    scores: Vec<ScoreEntry>,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct ScoreEntry {
    #[serde(alias = "playerName")]
    player_name: String,
    index: i64,
    score: StringOrInt,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
#[serde(untagged)]
pub enum StringOrInt {
    String(String),
    Integer(i64),
}

#[derive(Debug)]
struct HighScoresContext {
    highscores: HighScores,
}

pub fn template_highscores() -> Template {
    simple_template(String::from("highscores"))
}

mod floating_ts {
    use chrono::{DateTime, Utc, TimeZone};
    use serde::{self, Deserialize, Serializer, Deserializer};

    const FORMAT: &'static str = "%s%.f";

    pub fn serialize<S>(
        date: &DateTime<Utc>,
        serializer: S,
    ) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_f64(s.parse().expect("string to parse to float"))
    }

    pub fn deserialize<'de, D>(
        deserializer: D,
    ) -> Result<DateTime<Utc>, D::Error>
    where
        D: Deserializer<'de>,
    {
        let f = f64::deserialize(deserializer)?;
        let s = format!("{}", f);
        Utc.datetime_from_str(&s, FORMAT).map_err(serde::de::Error::custom)
    }
}


#[cfg(test)]
mod tests {
    use super::*;
    use pretty_assertions::assert_eq;
    use chrono::TimeZone;

    #[test]
    fn deserialize_timestamp() {
        let input = r#"{"uuid": [], "scores": {}, "timestamp": 1608849542.934364}"#;
        let result: serde_json::Result<HighScores> = serde_json::from_str(input);
        let expected = Utc.ymd(2020, 12, 24).and_hms_micro(22, 39, 2, 934364);
        match result {
            Ok(score) => assert_eq!(score.timestamp, expected),
            e => panic!("Expected to parse timestamp sucessfully, got {:#?}", e),
        };
    }

    fn test_deserialization<'a, T>(string: &'a str, expected: T)
        where T: std::fmt::Debug + PartialEq + Deserialize<'a>
    {
        let result: serde_json::Result<T> = serde_json::from_str(string);
        match result {
            Ok(deserialized) => assert_eq!(deserialized, expected),
            e => panic!("Expected to deserialize entry sucessfully, got {:#?}", e),
        };
    }

    #[test]
    fn deserialize_numeric_score() {
        let input = r#"
            {
              "index": 1,
              "playerName": "Prof_Bloodstone",
              "score": 6629
            }
        "#;
        let expected = ScoreEntry {
            index: 1,
            player_name: String::from("Prof_Bloodstone"),
            score: StringOrInt::Integer(6629),
        };
        test_deserialization(input, expected);
    }

    #[test]
    fn deserialize_string_score() {
        let input = r#"
            {
              "index": 1,
              "playerName": "Prof_Bloodstone",
              "score": "136.7K blocks"
            }
        "#;
        let expected = ScoreEntry {
            index: 1,
            player_name: String::from("Prof_Bloodstone"),
            score: StringOrInt::String(String::from("136.7K blocks")),
        };
        test_deserialization(input, expected);
    }

    #[test]
    fn deserialize_scores() {
        let input = r#"
            {
                "DisplayName": "Damage Taken",
                "scores": [
                    {
                        "index": 1,
                        "playerName": "Prof_Bloodstone",
                        "score": 6629
                    }
                ]
            }
        "#;
        let expected = ScoresEntry {
            name: String::from("Damage Taken"),
            scores: vec![ScoreEntry {
                index: 1,
                player_name: String::from("Prof_Bloodstone"),
                score: StringOrInt::Integer(6629),
            }],
        };
        test_deserialization(input, expected);
    }

    #[test]
    fn deserialize_full() {
        let input = r#"
            {
              "UUID": [
                {
                  "UUID": "c73bd1d2-d4c4-4324-806f-d9a6e7454d2e",
                  "lastKnownName": "Prof_Bloodstone"
                }
              ],
              "scores": {
                "Blocks traveled": {
                  "DisplayName": "Blocks traveled",
                  "scores": [
                    {
                      "index": 1,
                      "playerName": "Prof_Bloodstone",
                      "score": "136.7K blocks"
                    }
                  ]
                },
                "ts_DamageTaken": {
                  "DisplayName": "Damage Taken",
                  "scores": [
                    {
                      "index": 1,
                      "playerName": "Prof_Bloodstone",
                      "score": 6629
                    }
                  ]
                }
              },
              "timestamp": 1608744001.2054975
            }
        "#;
        let damage_taken = ScoresEntry {
            name: String::from("Damage Taken"),
            scores: vec![ScoreEntry {
                index: 1,
                player_name: String::from("Prof_Bloodstone"),
                score: StringOrInt::Integer(6629),
            }],
        };
        let blocks_traveled = ScoresEntry {
            name: String::from("Blocks traveled"),
            scores: vec![ScoreEntry {
                index: 1,
                player_name: String::from("Prof_Bloodstone"),
                score: StringOrInt::String(String::from("136.7K blocks")),
            }],
        };
        let mut score_map = HashMap::new();
        score_map.insert(String::from("Blocks traveled"), blocks_traveled);
        score_map.insert(String::from("ts_DamageTaken"), damage_taken);
        let expected = HighScores {
            uuid: vec![UserUUIDEntry {
                uuid: Uuid::parse_str("c73bd1d2-d4c4-4324-806f-d9a6e7454d2e").expect("UUID should parse sucessfully"),
                name: String::from("Prof_Bloodstone"),
            }],
            scores: score_map,
            timestamp: Utc.ymd(2020, 12, 23).and_hms_nano(17, 20, 1, 205497500),
        };
        test_deserialization(input, expected);
    }
}
