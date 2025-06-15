
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateOnePokemon {
    type: string;
    secondaryType?: Nullable<string>;
    name: string;
    id: number;
}

export class UpdateOnePokemon {
    type?: Nullable<string>;
    secondaryType?: Nullable<string>;
    name?: Nullable<string>;
    id: number;
}

export class FindManyPokemon {
    type?: Nullable<string>;
    name?: Nullable<string>;
    id?: Nullable<number>;
}

export interface BaseError {
    message: string;
}

export class InvalidInputError implements BaseError {
    message: string;
}

export class DuplicateIdError implements BaseError {
    message: string;
}

export class InexistentTypeError implements BaseError {
    message: string;
}

export class InexistentPokemonError implements BaseError {
    message: string;
}

export class DuplicateTypesError implements BaseError {
    message: string;
}

export class DeleteResult {
    status?: Nullable<boolean>;
}

export class Type {
    name?: Nullable<string>;
}

export class Pokemon {
    type?: Nullable<Type>;
    secondaryType?: Nullable<Type>;
    name?: Nullable<string>;
    id?: Nullable<number>;
}

export abstract class IQuery {
    abstract findManyPokemon(filter?: Nullable<FindManyPokemon>): Nullable<Pokemon[]> | Promise<Nullable<Pokemon[]>>;
}

export abstract class IMutation {
    abstract deleteOnePokemon(id: number): DeleteUnion | Promise<DeleteUnion>;

    abstract createOnePokemon(pokemon?: Nullable<CreateOnePokemon>): PokemonResult | Promise<PokemonResult>;

    abstract updateOnePokemon(pokemon?: Nullable<UpdateOnePokemon>): PokemonResult | Promise<PokemonResult>;
}

export type PokemonResult = Pokemon | InvalidInputError | DuplicateIdError | InexistentTypeError | InexistentPokemonError | DuplicateTypesError;
export type DeleteUnion = DeleteResult | InexistentPokemonError;
type Nullable<T> = T | null;
