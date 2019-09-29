import { randomId } from '../common/utils'
import NodePort from './port.vue'
import { Point } from '../common/types/point'

export class PortConnection {
  /* eslint-disable no-useless-constructor */
  constructor(
    public id: string = randomId(),
    public ports: NodePort[] = [],
    public anchor: Point = { x: 0, y: 0 }
  ) {}

  get points(): string {
    if (this.ports.length > 1) {
      const { x: x1, y: y1 } = this.ports[0].position
      const { x: x2, y: y2 } = this.ports[1].position
      return `${x1} ${y1}, ${x2} ${y2}`
    } else if (this.ports.length === 1) {
      const { x: x1, y: y1 } = this.ports[0].position
      const anchor = this.anchor
      return `${anchor.x} ${anchor.y}, ${anchor.x + x1} ${anchor.y + y1}`
    }
    return `0 0, 0 0`
  }
}
