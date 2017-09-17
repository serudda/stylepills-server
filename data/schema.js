import {
    makeExecutableSchema,
    //addMockFunctionsToSchema,
} from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `

type ColorPalette {
    id: ID!
    label: String
    hex: String
}

# Es la forma en la que definimos cuando queremos crear un objeto en una mutation
# Creamos este tipo: input. Y en el 'Mutation' addColorPalette, lo que vamos a pasarle
# es este input como parametro.
input ColorPaletteInput {
  colorPaletteId: ID!
  label: String
  hex: String
}

type UiComponent {
    id: ID!
    title: String
    colorPalette: [ColorPalette]
    css: String
    scss: String
    html: String
}

# This type specifies the entry points into our API. 
type Query {
    colorPalettes: [ColorPalette]
    colorPalette(id: ID!): ColorPalette
    uiComponents: [UiComponent]
    uiComponent(id: ID!): UiComponent
}

type Mutation {
  addColorPalette(colorPalette: ColorPaletteInput!): ColorPalette
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;


/**
Teoria:

- Types:
  Los types son una representación fuertemente tipada de su modelo de datos. En
  otras palabras es la forma en que describimos de que tipo es nuestra data.

---------------------------------------------------------------------------------

- Queries:
  Los queries son la forma en que defines que consultas se pueden ejecutar en tu
  schema.

  e.g.

  type Query {
    colorPalette(id: ID!): ColorPalette
    getUiComponents: [UiComponent]
  }

  Los clientes de GraphQL se comunican con los servidores de GraphQL a través de
  las 'queries' y las 'mutations'.

  Las Queries corresponden a 'GET' en REST.

  e.g.

  // Obtener todos los 'project'
  query {
    projects {
        name
        tagline
    }
  }

  // Obtener un 'project' en particular
  query {
    project (id: "1") {
        name
        tagline
    }
  }

--------------------------------------------------------------------------------

- Mutations:
  Las Mutations corresponden a las peticiones POST y UPDATE (aunque son realmente
  una versión sincrona de las Queries), que permiten enviar datos al servidor para
  realizar una inserción, actualizaciones y hacer otro trabajo.

  e.g.

  type Mutation {
      # Una mutation para agregar un nuevo canal a la lista de canales
      addChannel(name: String!): Channel
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
      # A mutation to add a new ui component to the list of ui components
      addUiComponent(uiComponent: UiComponent!): UiComponent
  }

--------------------------------------------------------------------------------

- Resolvers:
  Los resolvers son el enlace entre el tu Schema y tus datos. Es donde se realiza
  el trabajo de consultar los datos a tu base de datos. Aqui es donde iria la capa
  de base de datos para realizar las operaciones CRUD y devolver una respuesta
  adecuada.

  e.g.

  resolvers: {
    Query: {
      posts: () => posts,
      post: async (_, { id }) =>
        await Post.query()
    },
    Mutations: {
      createPost: async (_, { input }) =>
        await Post.query.insert(input)
    },
    Post: {
      author: async post =>
        await User.query().where("id", "=", post.author_id)
    }
  }

--------------------------------------------------------------------------------

- Schema:
  El schema es el corazón de GraphQL, es donde se conecta todas las partes: queries,
  types, mutations, etc.


 */
