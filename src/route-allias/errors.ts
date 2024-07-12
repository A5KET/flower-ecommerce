export class RouteAliasError extends Error {

}


export class AliasNotFoundError extends RouteAliasError {

}


export class AliasAlreadyRegisteredError extends RouteAliasError {

}


export class MissingRouteParameterError extends RouteAliasError {
  
}