#![feature(decl_macro)]

mod caching;
use caching::{Cached, Caching};

#[macro_use]
extern crate rocket;

use std::collections::HashMap;

use rocket::{http::hyper::header::CacheDirective, request::Request, response::NamedFile};
use rocket_contrib::templates::Template;
use std::path::{Path, PathBuf};

static CACHE_STATIC_MAX_AGE: u32 = 3600;

#[get("/")]
fn index() -> Template {
    simple_template(String::from("index"))
}

#[get("/highscores")]
fn highscores() -> Template {
    simple_template(String::from("highscores"))
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

fn simple_template(path: String) -> Template {
    let map: HashMap<String, String> = HashMap::with_capacity(0);
    Template::render(path, map)
}

#[catch(404)]
fn not_found(req: &Request) -> Template {
    let mut map = HashMap::new();
    map.insert("path", req.uri().path());
    Template::render("error/404", &map)
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/", routes![index, highscores, files, apply])
        .attach(Template::fairing())
        .register(catchers![not_found])
}

fn main() {
    rocket().launch();
}
