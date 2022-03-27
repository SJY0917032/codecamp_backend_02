/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원가입입니다.
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 아무개
 *               email:
 *                 type: string
 *                 example: example@example.com
 *               personal:
 *                 type: string
 *                 example: 9809171055722
 *               prefer:
 *                 type: string
 *                 example: https://naver.com
 *               pwd:
 *                 type: string
 *                 example: 1165
 *               phone:
 *                 type: string
 *                 example: '01012345678'
 *     responses:
 *       200:
 *           description: 가입 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: 62402e7523ab19452af47f60
 *       422:
 *           description: 토큰 인증이 안됐거나 핸드폰이 잘못된 경우
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: 에러!! 핸드폰 번호가 인증되지 않았습니다
 * /users:
 *   get:
 *     summary: 전체 회원 목록을 조회합니다
 *     tags: [Users]
 *     responses:
 *       200:
 *           description: 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     og:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: 네이버
 *                         description:
 *                           type: string
 *                           example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                         image:
 *                           type: string
 *                           example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 *                     _id:
 *                       type: string
 *                       example: 62402e7523ab19452af47f60
 *                       description: 가입한 유저의 ID값입니다.
 *                     name:
 *                       type: string
 *                       example: 아무개
 *                       description: 가입한 유저의 name
 *                     email:
 *                       type: string
 *                       example: example@example.com
 *                       description: 가입한 유저의 email
 *                     personal:
 *                       type: string
 *                       example: 101101-1122334
 *                       description: 가입한 유저의 주민번호입니다.
 *                     prefer:
 *                       type: string
 *                       example: https://naver.com
 *                       description: 가입한 유저의 좋아하는 사이트입니다.
 *                     pwd:
 *                       type: string
 *                       example: 1234
 *                       description: 가입한 유저의 비밀번호입니다.
 *                     phone:
 *                       type: string
 *                       example: '01012345678'
 *                       description: 가입한 유저의 핸드폰 번호입니다.
 *                     __v:
 *                       type: int
 *                       example: 0
 */
