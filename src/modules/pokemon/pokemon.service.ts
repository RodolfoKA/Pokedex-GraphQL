import { Injectable } from '@nestjs/common';
import prisma from '../../../prisma/seed/prisma.client';
import { CreateOnePokemon } from  'src/graphql.schema';
import { FindManyPokemon } from 'src/graphql.schema';
import { UpdateOnePokemon } from 'src/graphql.schema';

@Injectable()
export class PokemonService {
  constructor() {}

  async findManyPokemon(filter: FindManyPokemon) {
    const pokemonList = await prisma.pokemon.findMany({
      where: {
        id: filter.id,
        name: filter.name,
        type: {
          name: filter.type
        }
      },
      select:{
        id:true,
        name:true,
        type: {
          select: {
            name:true
          }
        },
        secondaryType:{
          select: {
            name: true
          }
        }
      }
    });
    
    
    return pokemonList;
  }

  // Internal function to validate the existence of a pokemon with the provided number
  async findOnePokemon(id: number) {
    return await prisma.pokemon.findUnique({
      where: {
        id
      }
    });
  }

  async deleteOnePokemon(id: number) {
    let isDeleted = false;
    
    // If the pokemon didn't exist before the delete, there is no use trying to delete it
    const pokemonInDatabase = await this.findOnePokemon(id);
    if(!pokemonInDatabase) {
      return{
        __typename: 'InexistentPokemonError',
        message: `There is no Pokemon with the number ${id}!`
      }
    }
    
    const deletePokemon = await prisma.pokemon.delete({
      where: { id: Number(id)}
    });

    if (typeof deletePokemon !== null) isDeleted = true;

    return {
      __typename: "DeleteResult",
      status: isDeleted
    };
  }

  async createOnePokemon(pokemon: CreateOnePokemon){
    // There is no pokemon with a number lower than 0... not even Missingno!
    if(pokemon.id <= 0){
      return {
        __typename: 'InvalidInputError',
        message: `The number(id) of a pokemon must be higher than 0!`
      }
    }

    // All pokemon must have some sort of name, even if its only one letter
    pokemon.name = pokemon.name.trim();
    if(pokemon.name.length < 1) {
      return {
        __typename: 'InvalidInputError',
        message: `The name of a pokemon has to have at least 1 character!`
      }
    }

    // The provided number must not be taken, there is no reuse of number in here! (Regional variants are not considered in here)
    const pokemonInDatabase = await this.findOnePokemon(pokemon.id);
    if(pokemonInDatabase) {
      return{
        __typename: 'DuplicateIdError',
        message: `There is already a Pokemon with the number ${pokemon.id}!`
      }
    }

    // The secondary typing is optional
    let secondaryTypeId = null;
    if(pokemon.secondaryType){
      //If you are trying to add a second type, it must be diferent than the primary type
      if(pokemon.type === pokemon.secondaryType){
        return{
          __typename: 'DuplicateTypesError',
          message: `Both the primary type and the secondary type are the same!`
        }
      } else {
        // The type must exist!
        const secondaryTypeCheck = await this.findOneType(pokemon.secondaryType);
        if (!secondaryTypeCheck){
          return{
            __typename: 'InexistentTypeError',
            message: `There is no type ${pokemon.secondaryType}!`
          }
        }
        secondaryTypeId = secondaryTypeCheck.id; 
      }
    }
    
    // The primary type must exist
    const typeCheck = await this.findOneType(pokemon.type);
    if (!typeCheck){
      return{
        __typename: 'InexistentTypeError',
        message: `There is no type ${pokemon.type}!`
      }
    }
    const typeId = typeCheck.id;    

    const newPokemon = await prisma.pokemon.create({
      data : {
        id: pokemon.id,
        name: pokemon.name,
        typeId,
        secondaryTypeId
      },
      select:{
        id:true,
        name:true,
        type: {
          select: {
            name:true
          }
        },
        secondaryType:{
          select: {
            name: true
          }
        }
      }
    })

    return {
      __typename: "Pokemon",
      id: newPokemon.id,
      name: newPokemon.name,
      type: newPokemon.type,
      secondaryType: newPokemon.secondaryType
    };
  }

  async updateOnePokemon(pokemon: UpdateOnePokemon){
    // If there is no pokemon to update, there is no need to push foward
    const pokemonInDatabase = await this.findOnePokemon(pokemon.id);
    if(!pokemonInDatabase) {
      return{
        __typename: 'InexistentPokemonError',
        message: `There no Pokemon with the number ${pokemon.id}!`
      }
    }

    // All pokemon must have some sort of name, even if its only one letter
    pokemon.name = pokemon.name.trim();
    if(pokemon.name.length < 1) {
      return {
        __typename: 'InvalidInputError',
        message: `The name of a pokemon has to have at least 1 character!`
      }
    }

    // The secondary typing is optional
    let secondaryTypeId = null;
    if(pokemon.secondaryType){
      //If you are trying to add a second type, it must be diferent than the primary type
      if(pokemon.type === pokemon.secondaryType){
        return{
          __typename: 'DuplicateTypesError',
          message: `Both the primary type and the secondary type are the same!`
        }
      } else {
        // The type must exist!
        const secondaryTypeCheck = await this.findOneType(pokemon.secondaryType);
        if (!secondaryTypeCheck){
          return{
            __typename: 'InexistentTypeError',
            message: `There is no type ${pokemon.secondaryType}!`
          }
        }
        secondaryTypeId = secondaryTypeCheck.id; 
      }
    }

    // The primary type must exist
    const typeCheck = await this.findOneType(pokemon.type);
    if (!typeCheck){
      return{
        __typename: 'InexistentTypeError',
        message: `There is no type ${pokemon.type}!`
      }
    }
    const typeId = typeCheck.id; 
    
    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemon.id },
      data : {
        name: pokemon.name,
        typeId,
        secondaryTypeId
      },
      select:{
        id:true,
        name:true,
        type: {
          select: {
            name:true
          }
        },
        secondaryType:{
          select: {
            name: true
          }
        }
      }
    })

    return {
      __typename: "Pokemon",
      id: updatedPokemon.id,
      name: updatedPokemon.name,
      type: updatedPokemon.type,
      secondaryType: updatedPokemon.secondaryType
    };
  }

  async findOneType(name: string) {
    return await prisma.types.findUnique({
      where: {
        name
      }
    });
  }
}
