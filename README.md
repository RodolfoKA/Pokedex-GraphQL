# Candidate Interview Project

## Project Overview

I have coded a simple pokedex, showcasing some concepts of GraphQL and Nest.

First I have implemented the 4 CRUD operations:
- Create (One pokemon)
- Read (Many pokemon)
- Update (One pokemon)
- Delete (One pokemon)

The project's overall structure is pretty simple, I have coded all of the operations in the 'pokemons' module, inside the 'src' directory. Due to some time limitations, it turned out a bit monolithic, the next step would be to encapsulate some validations (e.g. if some pokemon/type exists or not in the database) and take advantage of class-validators (to shorten the data validation that is being done manually).

I have decided to use prisma for the database operations.

There are two tables that I am using here: 'pokemons' and 'types'. At this point, each pokemon have a number(id), a name and one to up to two typings. These typings can't be equal for the same pokemon (but this is controlled only on the server side, it would be nice to look into controlling it in the database if possible). Each type has a unique name.

I have created a set of rules to some of the operations:
- The pokemon's name need to be at least 1 char long (create, update);
- The pokemon's number need to be higher than 0 (create, update);
- The pokemon's types can't be equal (create, update);
- The pokemon's types have to exist in the 'types' table (create, update);
- If you are trying to update or delete a pokemon, it needs to exist in the table (update, delete);
- If you are trying to add a pokemon, its number must not be taken (create)

The next step would be to add some pagination by extending the FindManyPokemon type in the 'pokemon.graphql' file.

I started doing some unit testing at first, but couldn't deepen it. It should not be functional now, seeing that it is expecting 151 entries and I removed almost them all to implement the types table.

### Attempted Goals

- Implement CRUD Operations (as resolvers) for the pokemons Table
- Data Validation and Error Handling (without class-validators)
- Convert the “type” field into a many-to-many table