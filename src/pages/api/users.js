import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password, birth_date, birth_time, gender, city_country, z_sign } = req.body;

      // 데이터 유효성 검사
      if (!name || !email || !password) {
        return res.status(400).json({ message: '이름, 이메일, 비밀번호는 필수 입력값입니다.' });
      }

      // 이메일 중복 체크
      const existingUser = await db('users').where({ email }).first();
      if (existingUser) {
        return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
      }

      // users 테이블에 데이터 삽입
      const [newUserId] = await db('users').insert({
        name,
        email,
        password,
        birth_date,
        birth_time,
        gender,
        city_country,
        z_sign,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      });

      return res.status(201).json({ message: '회원가입 성공!', userId: newUserId });
    } catch (error) {
      console.error('❌ 회원가입 오류:', error);
      return res.status(500).json({ message: '회원가입 중 오류 발생', error });
    }
  } else {
    return res.status(405).json({ message: '허용되지 않은 메소드' });
  }
}
