const _collectedModules = [];

class OmitJsForCssOnlyPlugin {
  constructor(options) {
    _collectedModules.length = 0;

    this.options = Object.assign({
      extensions: ["less", "scss", "css"],
      ignore: undefined,
    }, options);
  }

  apply(compiler) {
    const plugin = { name: this.constructor.name };

    const extensionsWithoutDots = this.options.extensions.map(e =>
      e[0] === "." ? e.substring(1) : e
    );

    const patternOneOfExtensions = extensionsWithoutDots
      .map(ext => escapeRegExp(ext))
      .join("|");

    const reStylesResource = new RegExp(
      `[.](${patternOneOfExtensions})([?].*)?$`
    );

    compiler.hooks.compilation.tap(plugin, compilation => {
      compilation.hooks.chunkAsset.tap(plugin, (chunk, file) => {
        if (!file.endsWith(".js") && !file.endsWith(".mjs")) {
          return;
        }
        if (!chunk.hasEntryModule()) {
          return;
        }

        const rawResources = collectEntryResources(chunk.entryModule);
        const resources = this.options.ignore
          ? rawResources.filter(r => !r.match(this.options.ignore))
          : rawResources;

        const isStyleOnly =
          resources.length &&
          resources.every(resource => reStylesResource.test(resource));
        if (isStyleOnly) {
          chunk.files = chunk.files.filter(f => f != file);
          delete compilation.assets[file];
        }
      });
    });
  }
}

function collectEntryResources(module, level = 0) {
  if (typeof module.resource == "string") {
    return [module.resource];
  }

  const resources = [];
  if (module.dependencies) {
    module.dependencies.forEach(dep => {
      if (dep && (dep.module || dep.originModule)) {
        const nextModule = dep.module || dep.originModule;
        if (_collectedModules.indexOf(nextModule.id) === -1) {
          _collectedModules.push(nextModule.id);
          const depResources = collectEntryResources(nextModule, level + 1);
          Array.prototype.push.apply(resources, depResources);
        }
      }
    });
  }

  return resources;
}

// https://github.com/lodash/lodash/blob/4.17.11/lodash.js#L14274
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(string) {
  string = String(string);
  return string && reHasRegExpChar.test(string)
    ? string.replace(reRegExpChar, "\\$&")
    : string;
}

module.exports = OmitJsForCssOnlyPlugin;
