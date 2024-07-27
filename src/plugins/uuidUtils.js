import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const uuidToBase64 = (uuid) => {
    const hex = uuid.replace(/-/g, '');
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const base64String = btoa(String.fromCharCode(...bytes));
    return base64String;
  };
  
 export const generateBase64UUID = () => {
    const uuid = uuidv4();
    return uuidToBase64(uuid);
  };

