import { readFileSync } from "node:fs";

// package.json is the single source of truth for the book version.
const { version, repository } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

const tag = `v${version}`;

// "git+https://github.com/owner/repo.git" -> "https://github.com/owner/repo"
const repositoryUrl = (repository?.url ?? "")
  .replace(/^git\+/, "")
  .replace(/\.git$/, "");

const FORMATS = {
  // 1.2.3
  version: () => [{ type: "text", value: version }],
  // v1.2.3
  tag: () => [{ type: "text", value: tag }],
  // v1.2.3, linking to the matching release on GitHub
  link: () => [
    {
      type: "link",
      url: `${repositoryUrl}/releases/tag/${tag}`,
      children: [{ type: "text", value: tag }],
    },
  ],
};

const plugin = {
  name: "book-version",
  roles: [
    {
      name: "book-version",
      doc: [
        "The book version, taken from the version field in package.json.",
        "The body picks the format: `version` (1.2.3), `tag` (v1.2.3), or",
        "`link` (v1.2.3, linking to the matching GitHub release).",
      ].join(" "),
      body: { type: String, required: true },
      run: (data, vfile) => {
        const format = String(data.body).trim();
        const render = FORMATS[format];
        if (!render) {
          vfile.message(
            `Unknown book-version format "${format}", expected one of: ${Object.keys(FORMATS).join(", ")}`
          );
          return FORMATS.tag();
        }
        if (format === "link" && !repositoryUrl) {
          vfile.message(
            "book-version `link` needs a repository.url field in package.json; falling back to plain text"
          );
          return FORMATS.tag();
        }
        return render();
      },
    },
  ],
};

export default plugin;
