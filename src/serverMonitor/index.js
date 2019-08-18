import si from "systeminformation";

const serverMonitor = async () => {
  let cpu;
  let memory;
  let discSpace;

  try {
    cpu = await si.currentLoad();
  } catch (err) {
    console.error(`Err: si.currentLoad()\n\n${err}`);
  }
  try {
    memory = await si.mem();
  } catch (err) {
    console.error(`Err: si.mem()\n\n${err}`);
  }
  try {
    discSpace = await si.fsSize();
  } catch (err) {
    console.error(`Err: si.fsSize()\n\n${err}`);
  }

  return {
    cpu,
    memory,
    discSpace,
  };
};

export { serverMonitor };
