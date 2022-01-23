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
          'TRACK\t0\tMASTER\t520\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t0\t0\t0\t1\t0\n' +
          'TRACK\t1\tAdamGtr\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
          'TRACK\t2\tSteveBass\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
          'TRACK\t3\tKrisGtr\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
          'TRACK\t4\tSteveBass Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t3\t1\t0\n' +
          'TRACK\t5\tAdamGtr Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t3\t1\t0\n' +
          'NTRACK\t5'
        )
      })
      this.get(
        '/TRACK;NTRACK;GET/TRACK/5/SEND/0;GET/TRACK/5/SEND/-1;GET/TRACK/5/SEND/-2;GET/TRACK/5/SEND/-3',
        () => {
          return (
            'TRACK\t0\tMASTER\t520\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t0\t0\t0\t1\t0\n' +
            'TRACK\t1\tAdamGtr\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
            'TRACK\t2\tSteveBass\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
            'TRACK\t3\tKrisGtr\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
            'TRACK\t4\tSteveBass Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t3\t1\t0\n' +
            'TRACK\t5\tAdamGtr Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t3\t1\t0\n' +
            'NTRACK\t5\n' +
            'SEND\t5\t0\t0\t0.101501\t0.000000\t-1\n' +
            'SEND\t5\t-1\t0\t0.344840\t0.000000\t1\n' +
            'SEND\t5\t-2\t0\t0.344840\t0.000000\t2\n' +
            'SEND\t5\t-3\t0\t2.392525\t0.000000\t3'
          )
        }
      )
      this.get(
        '/TRACK;NTRACK;GET/TRACK/4/SEND/0;GET/TRACK/4/SEND/-1;GET/TRACK/4/SEND/-2;GET/TRACK/4/SEND/-3',
        () => {
          return (
            'TRACK\t0\tMASTER\t520\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t0\t0\t0\t1\t0\n' +
            'TRACK\t1\tAdamGtr\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
            'TRACK\t2\tSteveBass\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
            'TRACK\t3\tKrisGtr\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t2\t0\t0\t0\n' +
            'TRACK\t4\tSteveBass Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t3\t1\t0\n' +
            'TRACK\t5\tAdamGtr Monitor\t128\t1.000000\t0.000000\t-1500\t-1500\t1.000000\t3\t0\t3\t1\t0\n' +
            'NTRACK\t5\n' +
            'SEND\t4\t0\t0\t0.628193\t0.000000\t-1\n' +
            'SEND\t4\t-1\t0\t0.278058\t0.000000\t1\n' +
            'SEND\t4\t-2\t8\t0.273263\t0.000000\t2\n' +
            'SEND\t4\t-3\t0\t1.000000\t0.000000\t3'
          )
        }
      )
    },
  })
}
