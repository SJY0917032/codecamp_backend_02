/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 커피 크롤링 데이터를 조회합니다
 *     tags: [starbucks]
 *     responses:
 *       200:
 *           description: 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 62402ec12b87c05c6eca6015
 *                     name:
 *                       type: string
 *                       example: 더블 에스프레소 칩 프라푸치노
 *                     img:
 *                       type: string
 *                       example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002760]_20210415133558068.jpg
 *                     __v:
 *                       type: int
 *                       example: 0
 */
