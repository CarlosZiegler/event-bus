import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

import { useEventBus } from './EventBus';

export default function ComponentA() {
  const { emitter } = useEventBus();
  const [logs, setLogs] = useState<any>([]);

  useEffect(() => {
    let didCancel = false;
    emitter.on('ec', (e: any) => {
      if (!didCancel) setLogs((logs: any) => [...logs, e.data]);
    });
    return () => {
      didCancel = true;
    };
  }, [emitter]);

  const handleClick = () => {
    emitter.emit('ea', { data: faker.name.findName() });
  };

  return (
    <div
      className="box"
      onScroll={(e) =>
        emitter.emit('scrollA', {
          data: 'Scroll From Component A',
          payload: e,
        })
      }
    >
      <p>Component A</p>
      <div>
        <button onClick={handleClick}>emit</button>
      </div>
      <h4>ComponentC Logs</h4>
      <div>
        {logs.map((log: any, index: number) => (
          <pre key={log + index}>{log}</pre>
        ))}
      </div>
    </div>
  );
}
