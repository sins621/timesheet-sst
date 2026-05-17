# Architecture

## Layers

The basic idea for the project is to utilize the concept of 'use-cases' for
_domain_ specific logic. For example, fetching information from the database
would not be considered a 'use-case' but creating a user would. That is because
creating a user might entail some form of **business-logic** that is important
to respect, maintain and capture in these areas.

Once the project grows these 'use-cases' and a 'use-cases' folder will emerge
with these functions.

These 'use-cases' should return models, or in other words, TypeScript types that
strictly model representations of data that are important to the operational
functionality of the application. For example, a 'Board' might be a type that
is worked with inside of use-cases that has utilities built to accept boards,
do an operation on them, and return the transformed object. Use cases should
always return [DomainErrors](../src/lib/constants/errors/domain-errors.ts).

Database operations or using external services should not contain any business
logic and they should purely cause a mutation on the database or external service
or return information. These should return [InfraErrors](../src/lib/constants/errors/infra-errors.ts)

Route handlers are to call use cases but there may be times where handlers are
purely doing simple operations which have no business logic i.e. fetching data
in which case the 'use-case' layer can be bypassed and it is acceptable to call
the database or external service directly inside of the route handler. Handlers
should however return [RouteErrors](../src/lib/constants/errors/route-errors.ts) so that API endpoints
can return the appropriate response codes.

## A note on testability

Unfortunately, due to the functional nature of these layers, there is no support
for dependancy injection and so when testing I encourage the use of 'monkey patching'
or import mocking with Vitest to achieve mocks for infrastructure where applicable.
I can't figure out a way to support DI in a functional paradigmn that doesn't involve
heavy passing of functions as parameters down the layers but if anyone has any
suggestions I am happy to hear them.

## The biggest rule

Keep **IO** and **Business Logic** seperate.
