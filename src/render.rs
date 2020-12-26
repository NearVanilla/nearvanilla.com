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

#[derive(Serialize, Deserialize, Debug)]
pub struct HighScores {
    #[serde(alias = "UUID")]
    uuid: Vec<UserUUIDEntry>,
    #[serde(with = "floating_ts")]
    timestamp: DateTime<Utc>,
    scores: HashMap<String, ScoresEntry>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserUUIDEntry {
    #[serde(alias = "UUID")]
    uuid: Uuid,
    #[serde(alias = "lastKnownName")]
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ScoresEntry {
    #[serde(alias = "DisplayName")]
    name: String,
    scores: Vec<ScoreEntry>,
}

#[derive(Serialize, Deserialize, Debug)]
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

    const FORMAT: &'static str = "%s.%6f";

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
}
