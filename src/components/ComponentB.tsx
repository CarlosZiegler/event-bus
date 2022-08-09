import React, { useEffect, useState } from 'react';
import { useEventBus } from './EventBus';

export default function ComponentB() {
  const { emitter } = useEventBus();
  const [logs, setLogs] = useState<any>([]);

  useEffect(() => {
    let didCancel = false;
    emitter.on(
      'ea',
      (e: any) => !didCancel && setLogs((logs: any) => [...logs, e.data])
    );
    return () => {
      didCancel = true;
    };
  }, [emitter]);

  return (
    <div className="box">
      <p>Component B</p>
      <ol className="names">
        {logs.map((log: any, index: number) => (
          <li key={log + index}>{log}</li>
        ))}
      </ol>
    </div>
  );
}
