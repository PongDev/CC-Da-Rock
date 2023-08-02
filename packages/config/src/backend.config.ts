/* eslint turbo/no-undeclared-env-vars: 0 */

export type BackendConfig = {
  node_env: string;
  url: string;
  port: number;
  bcrypt: {
    hashRound: number;
  };
  jwt: {
    accessToken: {
      secret: string;
      expire: number;
    };
    refreshToken: {
      secret: string;
      expire: number;
    };
    emailToken: {
      secret: string;
      expire: number;
    };
  };
  swagger: {
    enable: boolean;
    prefixPath: string;
  };
  graphql: {
    debug: boolean;
    playground: boolean;
    autoSchemaFile: string | boolean;
    sortSchema: boolean;
    path: string;
  };
  email: {
    // host: string,
    service: string;
    // port: number,
    // secure: true,
    auth: {
      user: string;
      pass: string;
    };
  };
  omise: {
    publicKey: string;
    secretKey: string;
  };
};

export const loadBackendConfig = (): BackendConfig => {
  let autoSchemaFile: string | boolean;
  let graphqlPath: string;
  if (
    process.env.BACKEND_GRAPHQL_AUTO_SCHEMA_FILE !== undefined &&
    ["true", ""].includes(process.env.BACKEND_GRAPHQL_AUTO_SCHEMA_FILE.trim())
  ) {
    autoSchemaFile = true;
  } else {
    autoSchemaFile = process.env.BACKEND_GRAPHQL_AUTO_SCHEMA_FILE ?? true;
  }

  if (
    process.env.BACKEND_GRAPHQL_PATH &&
    process.env.BACKEND_GRAPHQL_PATH.trim() !== ""
  ) {
    graphqlPath = process.env.BACKEND_GRAPHQL_PATH;
  } else {
    graphqlPath = "graphql";
  }

  return {
    node_env: process.env.NODE_ENV ?? "development",
    url: process.env.BACKEND_HOST || "http://localhost",
    port: parseInt(process.env.BACKEND_PORT ?? "", 10) || 3000,
    bcrypt: {
      hashRound:
        parseInt(process.env.BACKEND_BCRYPT_HASH_ROUNDS ?? "", 10) || 12,
    },
    jwt: {
      accessToken: {
        secret: process.env.BACKEND_JWT_ACCESS_TOKEN_SECRET ?? "",
        expire:
          parseInt(process.env.BACKEND_JWT_ACCESS_TOKEN_EXPIRE ?? "", 10) ||
          900,
      },
      refreshToken: {
        secret: process.env.BACKEND_JWT_REFRESH_TOKEN_SECRET ?? "",
        expire:
          parseInt(process.env.BACKEND_JWT_REFRESH_TOKEN_EXPIRE ?? "", 10) ||
          604800,
      },
      emailToken: {
        secret: process.env.BACKEND_JWT_EMAIL_TOKEN_SECRET ?? "",
        expire:
          parseInt(process.env.BACKEND_JWT_EMAIL_TOKEN_EXPIRE ?? "", 10) || 60,
      },
    },
    swagger: {
      enable: process.env.BACKEND_SWAGGER_ENABLE === "true",
      prefixPath: process.env.BACKEND_SWAGGER_PREFIX_PATH ?? "api",
    },
    graphql: {
      debug: process.env.BACKEND_GRAPHQL_DEBUG === "true",
      playground: process.env.BACKEND_GRAPHQL_PLAYGROUND_ENABLE === "true",
      autoSchemaFile,
      sortSchema: process.env.BACKEND_GRAPHQL_SORT_SCHEMA === "true",
      path: graphqlPath,
    },
    email: {
      // host: process.env.EMAIL_HOST || 'smtp.gamil.com',
      service: process.env.EMAIL_SERVICE || "gmail",
      // port: 587,
      // secure: true,
      auth: {
        user: process.env.EMAIL_AUTH_USER || "default@gmail.com",
        pass: process.env.EMAIL_AUTH_PASS || "default_password",
      },
    },
    omise: {
      publicKey: process.env.OMISE_PUBLIC_KEY || "missing",
      secretKey: process.env.OMISE_SECRET_KEY || "missing",
    },
  };
};
