import React, { useState, useEffect } from 'react';
import { useEventBus } from './EventBus';

import { faker } from '@faker-js/faker';

export default function ComponentC() {
  const { emitter } = useEventBus();
  const [user, setUser] = useState({ name: '', img: '' });
  const [logs, setLogs] = useState<any>([]);
  useEffect(() => {
    let didCancel = false;
    emitter.on(
      'ea',
      (e: any) =>
        !didCancel &&
        setUser({
          name: e.data,
          img: faker.image.avatar(),
        })
    );
    emitter.on(
      'scrollA',
      (e: any) => !didCancel && setLogs((logs: any) => [...logs, e.data])
    );
    return () => {
      didCancel = true;
    };
  }, [emitter]);

  return (
    <div className="box">
      <p>Component C</p>
      <div>
        <button
          onClick={() => emitter.emit('ec', { data: 'Click From Component C' })}
        >
          emit
        </button>
      </div>
      {user.name && (
        <>
          <img src={user.img} alt="avatar" />
          <span>{user.name}</span>
          <h6>User From Component A</h6>
        </>
      )}
      {logs.map((log: any) => (
        <pre key={log}>{log}</pre>
      ))}
    </div>
  );
}
