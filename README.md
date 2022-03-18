# Gulp assembly for freelance
### Features
#### :pinched_fingers: Including HTML files in other HTML files

To include html file in html file use `@@include('file_path/file.html', {})`

For example:
```
<body class="wrapper">
  @@include('html/_header.html', {})
</body>
```

#### :pinched_fingers: Using scss -> css preprocessor
__Use__ *`src/scss`* directory for writing scss code which compiles to *`dist/css`* directory
```
some_item {
  $color: tomato;
  &__subitem {
    background-color: $color;
  }
}
```
:point_down:
```
some_item .some_item__subitem {
  background-color: tomato;
}
```
#### :pinched_fingers: Converting png, jpg and etc. -> webp
Js code checks if browser allows webp formats to display. If not - uses original pictures
