export enum PortEvent {
  MOVE_START = 'moveStart',
  MOVE = 'move',
  MOVE_END = 'moveEnd'
}

export enum ConnectionEvent {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  MULTI_CONNECT = 'multi-connect',
  MULTI_DISCONNECT = 'multi-disconnect'
}

export enum NodeEvent {
  DELETE = 'delete',
  EDIT = 'edit'
}
