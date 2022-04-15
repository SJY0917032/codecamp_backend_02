import {
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import axios from 'axios';

  
  import { config } from 'dotenv';

  config();

  @Injectable()
  export class iamPortService {  
    // 아임포트서비스로 옮겨야합니다
    async createIamPortToken(): Promise<any> {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
          
        imp_key: process.env.IMPAPIKEY,
        imp_secret:
        process.env.IMPSECRETKEY,
      });
      return result.data.response.access_token;
    }

    async searchIamPort({impUid}): Promise<any> {
      const token = await this.createIamPortToken()
      const iamPortResult = await axios
      .get(`https://api.iamport.kr/payments/${impUid}`, {
        headers: { Authorization: token },
      })
      .catch((e) => {
        throw new UnprocessableEntityException(
          '해당 결제 정보가 존재하지 않습니다.',
        );
      });
      return iamPortResult
    }

    async cancelIamPort({reason, impUid, merchant_uid, checksum}): Promise<any> {
      const token = await this.createIamPortToken()
      const cancelResult = await axios
      .post(
        'https://api.iamport.kr/payments/cancel',
        {
          reason: reason,
          imp_uid: impUid,
          merchant_uid: merchant_uid,
          checksum: checksum
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .catch((e) => {
        console.log(e.data.message);
        throw new UnprocessableEntityException(
          '취소과정중에 에러가 발생했습니다.',
        );
      });
      return cancelResult
    }
  }