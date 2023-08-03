import { readFileSync, writeFileSync } from "fs";
import { defineConfig } from "orval";

export default defineConfig({
  ccdarock: {
    input: "http://localhost:8000/swagger-json",
    output: {
      mode: "tags",
      target: "src/oapi-client",
      client: "react-query",
      clean: ["src/oapi-client/*"],
      override: {
        operations: {
          AuthController_resendEmailVerification: {
            query: {
              useMutation: true,
            },
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: (paths: string[]) => {
        paths.forEach((path) => {
          const content = readFileSync(path, "utf-8");
          const newContent = content.replaceAll(
            "// eslint-disable-next-line @typescript-eslint/no-redeclare",
            "",
          );
          writeFileSync(path, newContent);
        });
      },
    },
  },
});
