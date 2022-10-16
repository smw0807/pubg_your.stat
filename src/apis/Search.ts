import axios from '../plugins/axios';
const api = import.meta.env.VITE_PUBG_API_URL;
export class SearchAPI {
  getAPI(url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await axios.get(api + url);
        if (rs.status === 200) {
          resolve(rs);
        } else {
          reject(rs);
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
  async getSeasonIDs(platform: string) {
    try {
      const rs = await this.getAPI(`/${platform}/seasons`);
      return rs;
    } catch (err) {
      return err;
    }
  }
}
