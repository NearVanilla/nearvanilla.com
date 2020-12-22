#![feature(decl_macro)]
#[macro_use]
extern crate rocket;
use rocket_contrib::serve::StaticFiles;

use std::collections::HashMap;

use rocket::{
    http::Status,
    response::{self, Responder},
    Request,
};
use rocket_contrib::templates::Template;

#[derive(serde::Serialize)]
struct TemplateContext {
    items: Vec<&'static str>,
}
/// If response status is `status::InternalServer`,
/// change it to `status::NotFound`
#[derive(Debug, Clone, PartialEq)]
pub struct InternalToNotFound<R>(pub R);

/// If response is 500, it returns 404 instead
impl<'r, 'o: 'r, R: Responder<'r>> Responder<'r> for InternalToNotFound<R> {
    fn respond_to(self, req: &Request<'_>) -> response::Result<'r> {
        let responder = self.0;
        responder.respond_to(req).map_err(|e| match e {
            Status::InternalServerError => Status::NotFound,
            other => other,
        })
    }
}

#[get("/")]
fn index() -> Template {
    templates(String::from("index")).0
}

#[get("/<path>")]
fn templates(path: String) -> InternalToNotFound<Template> {
    let context = TemplateContext {
        items: vec!["One", "Two", "Three"],
    };
    InternalToNotFound(Template::render(path, &context))
}

#[catch(404)]
fn not_found(req: &Request) -> Template {
    let mut map = HashMap::new();
    map.insert("path", req.uri().path());
    Template::render("error/404", &map)
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/", routes![index, templates])
        .mount("/static/", StaticFiles::from("static"))
        .attach(Template::fairing())
        .register(catchers![not_found])
}

fn main() {
    rocket().launch();
}
