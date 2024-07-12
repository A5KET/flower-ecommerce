export const ROUTE_ALIAS_METADATA = 'allias'


export const Alias = (alias: string): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(ROUTE_ALIAS_METADATA, alias, descriptor.value)

    return descriptor
  }
}