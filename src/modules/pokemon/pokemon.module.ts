import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonResolver } from './pokemon.resolver';

@Module({
  providers: [ PokemonResolver, PokemonService],
})
export class PokemonModule {}
