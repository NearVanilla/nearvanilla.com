// Licensed under Apache-2.0 by rust-lang.org
// Source: https://github.com/rust-lang/www.rust-lang.org/blob/3f01de5dc268ced0d72a2eb978cf04f234ada493/src/caching.rs

use rocket::{
    http::hyper::header::{CacheControl, CacheDirective},
    request::Request,
    response::{self, Responder},
};

pub struct Cached<R> {
    inner: R,
    directives: Vec<CacheDirective>,
}

impl<'r, R> Responder<'r> for Cached<R>
where
    R: Responder<'r>,
{
    fn respond_to(self, req: &Request) -> response::Result<'r> {
        let Cached { inner, directives } = self;
        inner.respond_to(req).map(|mut res| {
            res.set_header(CacheControl(directives));
            res
        })
    }
}

pub trait Caching
where
    Self: Sized,
{
    fn cached(self, directives: Vec<CacheDirective>) -> Cached<Self>;
}

impl<'r, R> Caching for R
where
    R: Responder<'r>,
{
    fn cached(self, directives: Vec<CacheDirective>) -> Cached<Self> {
        Cached {
            inner: self,
            directives,
        }
    }
}
