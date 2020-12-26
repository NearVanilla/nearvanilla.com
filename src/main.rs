#![feature(decl_macro)]

mod caching;
use caching::{Cached, Caching};
mod render;

use render::{simple_template, template_highscores, HighScores};
mod error;
use error::{Error, Result, StateError};

#[macro_use]
extern crate rocket;

use std::{collections::HashMap, fs::File, sync::RwLock};

use rocket::{http::hyper::header::CacheDirective, request::Request, response::NamedFile};
use rocket_contrib::templates::Template;
use std::path::{Path, PathBuf};

use std::io::prelude::*;

static CACHE_STATIC_MAX_AGE: u32 = 3600;

#[get("/")]
fn index() -> Template {
    simple_template(String::from("index"))
}

#[get("/highscores")]
fn highscores() -> Template {
    template_highscores()
}

#[get("/apply")]
fn apply() -> Template {
    simple_template(String::from("apply"))
}

#[get("/static/<file..>", rank = 1)]
fn files(file: PathBuf) -> Option<Cached<NamedFile>> {
    NamedFile::open(Path::new("static/").join(file))
        .ok()
        .map(|file| file.cached(vec![CacheDirective::MaxAge(CACHE_STATIC_MAX_AGE)]))
}

#[catch(404)]
fn not_found(req: &Request) -> Template {
    let mut map = HashMap::new();
    map.insert("path", req.uri().path());
    Template::render("error/404", &map)
}

pub struct AppState {
    pub highscores_state_file: PathBuf,
}

pub struct HighScoreState {
    state: RwLock<HighScores>,
}

impl HighScoreState {
    fn from_file<P: Into<PathBuf>>(path: P) -> Result<HighScoreState> {
        let mut s = String::new();
        let path: PathBuf = path.into();
        File::open(&path)
            .and_then(|mut f| f.read_to_string(&mut s))
            .map_err(|e| StateError::ReadState { path, source: e })?;
        let highscores: HighScores = serde_json::from_str(&s).map_err(|e| Error::DeserializeError(e))?;
        Ok(HighScoreState {
            state: RwLock::new(highscores),
        })
    }
}

fn rocket(app_state: AppState, highscore_state: HighScoreState) -> rocket::Rocket {
    rocket::ignite()
        .mount("/", routes![index, highscores, files, apply])
        .register(catchers![not_found])
        .attach(Template::fairing())
        .manage(app_state)
        .manage(highscore_state)
}

fn main() -> Result<()> {
    let app_state = AppState {
        highscores_state_file: PathBuf::from("state/highscores.json"),
    };

    let highscore_state = HighScoreState::from_file(app_state.highscores_state_file.clone())?;
    rocket(app_state, highscore_state).launch();
    Ok(())
}
