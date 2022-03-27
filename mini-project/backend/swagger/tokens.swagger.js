/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증을 요청합니다.
 *     tags: [Tokens]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: '01012345678'
 *     responses:
 *       200:
 *           description: 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: 토큰을 전송했습니다.
 *   patch:
 *     summary: 받은 토큰번호로 인증을 요청합니다.
 *     tags: [Tokens]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: '01012345678'
 *               token:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *           description: 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: boolean
 *                 example: true
 *               examples:
 *                 success:
 *                   summary: 성공하면 true값을 리턴 받습다다
 *                   value: true
 *                 error:
 *                   summary: 실패시 false값을 리턴 받습니다.
 *                   value: false
 */
