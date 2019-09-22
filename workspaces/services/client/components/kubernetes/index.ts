const path = require('path')
const fs = require('fs')
const k8s = require('./swagger.json')
const definitions = Object.keys(k8s.definitions)

const APIs = [
  // 'io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta',
  'io.k8s.api.core.v1.Service'
  // 'io.k8s.api.core.v1.ServiceSpec',
  // 'io.k8s.api.extensions.v1beta1.Deployment',
  // 'io.k8s.api.extensions.v1beta1.DeploymentSpec'
]

function mergeDefinitions(def: any) {
  let result = def
  if (def && typeof def === 'object') {
    const keys = Object.keys(def)
    try {
      keys.some((key) => {
        const item = def[key]
        if (key === '$ref') {
          const defName = item.replace('#/definitions/', '')
          const defValue = mergeDefinitions(k8s.definitions[defName])
          result = defValue
          return true
        } else {
          if (key.startsWith('x-kubernetes')) {
            if (Array.isArray(def[key])) {
              def[key].forEach((element: any) => {
                if (typeof element === 'object') {
                  const names = Object.keys(element)
                  names.forEach((name) => {
                    def.properties[name] = element[name]
                  })
                }
              })
            }
          } else {
            def[key] = mergeDefinitions(def[key])
          }
        }
        return false
      })
    } catch (e) {
      console.log('------------')
      console.log(e)
      console.log(keys)
      console.log(def)
      console.log('------------')
    }
  }
  return result
}

const coreAPIKeys = definitions.filter((item: string) => APIs.includes(item))
const coreAPIs = coreAPIKeys.map((key) => ({
  name: key,
  ...mergeDefinitions(k8s.definitions[key])
}))

fs.writeFileSync(path.resolve('./core-apis.json'), JSON.stringify(coreAPIs))
