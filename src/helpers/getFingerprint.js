import Fingerprint2 from 'fingerprintjs2';

const getFingerprint = async () => {
  const components = await Fingerprint2.getPromise();
  const values = components.map(component => component.value);
  const hash = Fingerprint2.x64hash128(values.join(''), 31);
  const mapped = {};
  components.forEach(component => {
    if (['fonts', 'webgl', 'canvas', 'plugins'].includes(component.key)) {
      return;
    }
    mapped[component.key] = component.value;
  });

  return {
    hash,
    mapped,
  };
};

export default getFingerprint;
