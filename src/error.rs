use std::{fs, io, path::PathBuf};
use thiserror::Error as ThisError;

#[derive(Debug, ThisError)]
pub enum Error {
    #[error("error operating on state")]
    StateError(#[from] StateError),
    #[error("error deserializing object")]
    DeserializeError(#[from] serde_json::Error),
    #[error("impossible error has occured, reason was {reason}")]
    ImpossibleError { reason: String },
}

#[derive(Debug, ThisError)]
pub enum StateError {
    #[error("Unable to read state from {path:?}: {source}")]
    ReadState { source: io::Error, path: PathBuf },
    #[error("Unable to write state to {path:?}: {source}")]
    WriteResult { source: io::Error, path: PathBuf },
}

pub type Result<T, E = Error> = std::result::Result<T, E>;
