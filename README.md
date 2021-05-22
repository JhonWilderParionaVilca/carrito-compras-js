# VITE VANILLA

Plantilla creada con vitejs

## Creación

```sh
$ yarn create @vitejs/app
# selecciona vanilla
# selecciona javascript
```

## [Deploy con ghpages](https://github.com/JamesIves/github-pages-deploy-action/tree/dev)

Por defecto se usa token, pero si quieres usar [ssh-key](https://github.com/JamesIves/github-pages-deploy-action/tree/dev#using-an-ssh-deploy-key-)

En este ejemplo se deploya con token y con [yarn](https://github.com/actions/setup-node)

## [Configurar vite para ghpages](https://vitejs.dev/guide/static-deploy.html#github-pages)

Debemos configurar base en `vite.config.js` para que coincida con nuestra url de ghpages