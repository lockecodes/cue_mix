/* eslint-disable */
import { createServer } from 'miragejs'
import * as presets from 'data/presets.json'

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    routes() {
      this.get('/data/presets.json', () => {
        return presets
      })

      this.namespace = '_'
      this.get('/TRACK;NTRACK;', () => {
        return (
          'NTRACK\t2\n' +
          'TRACK\t0\tMASTER\t520\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t0\t0\t0\t1\t0\n' +
          'TRACK\t1\tAdamGtr\t202\t1.000000\t0.000000\t-482\t-482\t1.000000\t3\t1\t0\t0\t0\n' +
          'TRACK\t2\tAdamGtr Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t1\t1\t0'
        )
      })
      this.get('/TRACK/0', () => {
        return 'TRACK\t0\tMASTER\t520\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t0\t0\t0\t1\t0'
      })
      this.get('/TRACK/1', () => {
        return 'TRACK\t1\tAdamGtr\t202\t1.000000\t0.000000\t-482\t-482\t1.000000\t3\t1\t0\t0\t0'
      })
      this.get('/TRACK/2', () => {
        return 'TRACK\t2\tAdamGtr Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t1\t1\t0'
      })
      this.get('/TRACK/1/SEND/0', () => {
        return 'SEND\t0\t0\t0\t1.000000\t0.000000\t-1'
      })
      this.get('/TRACK/2/SEND/0', () => {
        return 'SEND\t1\t0\t0\t1.000000\t0.000000\t2'
      })
      this.get('/TRACK/1/SEND/1', () => {
        return 'SEND\t1\t0\t0\t1.000000\t0.000000\t2'
      })
      this.get('/TRACK/2/SEND/1', () => {
        return 'SEND\t1\t0\t0\t1.000000\t0.000000\t2'
      })
      this.get('/TRACK/1/SEND/2', () => {
        return 'SEND\t2\t0\t8\t1.000000\t0.000000\t-1'
      })
      this.get('/TRACK/2/SEND/2', () => {
        return 'SEND\t2\t0\t8\t1.000000\t0.000000\t-1'
      })
      this.get('/TRACK/2/SEND/0;TRACK/2/SEND/-1', () => {
        return 'SEND\t2\t-1\t0\t1.000000\t0.000000\t1\n' + 'SEND\t2\t0\t8\t1.000000\t0.000000\t-1'
      })
      this.get('/TRACK;NTRACK;TRACK/2/SEND/0;TRACK/2/SEND/-1', () => {
        return (
          'SEND\t2\t-1\t0\t1.000000\t0.000000\t1\n' +
          'SEND\t2\t0\t8\t1.000000\t0.000000\t-1\n' +
          'NTRACK\t2\n' +
          'TRACK\t0\tMASTER\t520\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t0\t0\t0\t1\t0\n' +
          'TRACK\t1\tAdamGtr\t202\t1.000000\t0.000000\t-542\t-542\t1.000000\t3\t1\t0\t0\t0\n' +
          'TRACK\t2\tAdamGtr Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t1\t1\t0'
        )
      })
    },
  })
}
