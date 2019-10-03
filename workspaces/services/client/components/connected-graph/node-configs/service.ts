export const ServiceNodeConfig = {
  type: 'io.k8s.api.core.v1.Service',
  properties: {
    name: {
      component: 'input',
      type: 'string',
      default: 'Untitled-Service',
      data: 'name'
    },
    port: {
      component: 'input',
      type: 'number',
      default: 80,
      data: 'port.number',
      prepend: {
        component: 'select',
        type: 'string',
        default: 'TCP',
        placeholder: 'Protocol',
        data: 'port.protocol',
        options: [
          { label: 'TCP', value: 'tcp' },
          { label: 'UDP', value: 'udp' },
          { label: 'SCTP', value: 'sctp' }
        ]
      }
    }
  }
}
