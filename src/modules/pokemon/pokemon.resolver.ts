import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PokemonService } from './pokemon.service';
import { FindManyPokemon } from 'src/graphql.schema';
import { UpdateOnePokemon } from 'src/graphql.schema';
import { CreateOnePokemon } from 'src/graphql.schema';

@Resolver('Pokemon')
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query('findManyPokemon')
  findManyPokemon(@Args("filter") filter: FindManyPokemon) {
    return this.pokemonService.findManyPokemon(filter);
  }

  @Mutation('deleteOnePokemon')
  deleteOnePokemon(@Args('id') id: number) {
    return this.pokemonService.deleteOnePokemon(id);
  }

  @Mutation('createOnePokemon')
  createOnePokemon(@Args('pokemon') pokemon: CreateOnePokemon) {
    return this.pokemonService.createOnePokemon(pokemon);
  }

  @Mutation('updateOnePokemon')
  updateOnePokemon(@Args('pokemon') pokemon: UpdateOnePokemon) {
    return this.pokemonService.updateOnePokemon(pokemon);
  }
}
