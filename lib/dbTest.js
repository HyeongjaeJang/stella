const db = require('./db');

async function testConnection() {
  try {
    const result = await db.raw('SELECT 1+1 AS result'); // 간단한 쿼리 실행
    console.log('✅ DB 연결 성공:', result[0]);
  } catch (error) {
    console.error('❌ DB 연결 실패:', error);
  } finally {
    db.destroy(); // 연결 종료
  }
}

testConnection();
