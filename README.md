# pull-split

[split](https://github.com/dominictarr/split) ported to
[pull-stream](https://github.com/dominictarr/pull-stream) style.

## Example

``` js
textStream
  .pipe(split())
  .pipe(output)
```

## License

MIT
