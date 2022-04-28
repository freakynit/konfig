![🚀✨Konfig✨](./logo.png)

---

# 🚀✨Konfig✨
🥰The KISS way of configuring your application. 
- 👏️No BS.
- 👏No bloat.
- 👏No unnecessary complexity.
- 👏One line and your application is ready.

## ⚡️Features
* Dead simple
* Super extensible
  - Configure in Yaml`(pre-packaged)`, JSON`(pre-packaged)`, TOML`(plugin available)`, Properties,... ✔.
  - Configure from local file`(pre-packaged)`, S3`(plugin available)`, HTTP, Etcd, redis, MySQL,... ✔.
  - Replace tokens from environment variables`(pre-packaged)`, vault, etcd, DB,... ✔.
* Super tiny, just one dependency
* Plugin based architecture
* Written in typescript with type definitions
* No unnecessary bloat

## ☝️Why
Because something simple that just works is always desired over something that is complex and difficult to setup. Exposing 100's of options is not an option... pun intended. The pre-packaged implementation includes support for:
* Loading config file from local disk
* YAML based config
* Replacing tokens from environment variables for different deployment environments.
> And yes, you don't need (you shouldn't) have different configuration files for different environments. Definition should be same. Only values should change.

## 🔥Usage
We'll consider following config file as an example:
```yaml
port: ${PORT:-8001}
logLevel: ${LOG_LEVEL:-info}
logDirectory: ${LOG_DIRECTORY:-/var/log}
```
The tokens are contained within `${` and `}` pair. They represent variables whose value can come from, for example, environment variables. Text after `:-` is the default value that is used when corresponding token value is not found from, for example, environment variable. This part is optional.

### 1. All defaults:
```typescript
import {konfig} from 'konfig';
const config = await konfig();  // loads from default `config.yaml` from current directory
```

### 2. Specify local config file path:
```typescript
import {konfig} from 'konfig';
const config = await konfig('./config.yaml');
```

### 3. Using JSON config file instead of YAML
```typescript
import {konfig, parsers} from 'konfig';
const config = await konfig('./config.json', {parser: parsers.JsonParser})
```

### 4. Load from S3 using [konfig-s3-loader](https://github.com/freakynit/konfig-s3-loader) plugin
```typescript
// npm install --save konfig-s3-loader
import {konfig, contracts} from 'konfig';
import {S3Provider} from 'konfig-s3-loader';

const s3Provider = (): contracts.Loader => S3Provider({
  s3Config: {
    accessKeyId: '<AWS_S3_ACCESS_KEY>',
    secretAccessKey: '<AWS_S3_ACCESS_KEY_SECRET>',
    region: '<AWS_S3_REGION>'
  }
});
const config = await konfig('s3://<bucket>/<config-file-path>', {loader: s3Provider});
```
> More details on plugin page

### 5. Using TOML config file instead of YAML using [konfig-toml-parser](https://github.com/freakynit/konfig-toml-parser) plugin
```typescript
import {konfig} from 'konfig';
import {TomlParser} from 'konfig-toml-parser';

const config = await konfig('config.toml', {parser: TomlParser});
```
> More details on plugin page

## 🔬Architecture
`Konfig` expects 2 parameters, both optional.
1. A `uri`, or a `string` like object, which represents the location of config file.
2. An `object` containing following components fields (all optional):
   1. A `loader` component of type `contracts.Loader` or `LoaderProvider`: This component is responsible for `loading` config file from given `uri` into memory in string format.
   2. A `tokenizer` component of type `contracts.Tokenizer` or `TokenizerProvider`: This component is responsible for `tokenizing` config file content into tokens. If no tokens are present, this should behave as a no-op.
   3. A `tokenSubstitutor` component of type `contracts.TokenSubstitutor` or `TokenSubstitutorProvider`: This component is responsible for `substituting` tokens as passed by the `tokenizer`. For example, the pre-packaged `environment variable tokenSubstitutor` substitutes these tokens by looking up environment variables.
   4. A `parser` component of type `contracts.Parser` or `ParserProvider`: This component is responsible for `parsing` the string content into a json object which is what is returned by konfig module. This is the final phase in the pipeline.
3. The `Provider` variants can be used when corresponding component needs some initialization. This is similar to a `constructor` in a class. `S3Provider`, for example, is an example of this variant. It returns an instance of `contracts.Loader` after initialization.

## 🤝Contributing
We are always looking for contributors of all skill levels! Code quality, tests, plugins, refactorings, documentation, examples, there's so much to contribute to. Contributions are always welcome😊

> **Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request) 

## License

This project is open source and available under the [MIT License](LICENSE).
