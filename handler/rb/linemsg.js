require('dotenv').config({path:'/home/siteline/.env'})

const register = {
  "type": "bubble",
  "size": "mega",
  "hero": {
    "type": "image",
    "url": "https://lineapi.egat.co.th/img/register.jpg",
    "size": "full",
    "aspectMode": "cover",
    "aspectRatio": "50:22"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "\"ข้อมูลระเบียบปฏิบัติ กฟผ. จาก \"คุณระเบียบ\" เป็นข้อมูลภายในหน่วยงานของ กฟผ.  ที่มีไว้เพื่ออำนวยความสะดวกในการปฏิบัติงานสำหรับพนักงาน กฟผ. เท่านั้น  ห้ามนำข้อมูลดังกล่าวไปเผยแพร่สู่ภายนอก\"",
        "weight": "regular",
        "size": "sm",
        "align": "center",
        "wrap": true,
        "color": "#EE3432"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "lg",
        "spacing": "sm",
        "contents": []
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "primary",
        "height": "md",
        "action": {
          "type": "uri",
          "label": "ลงทะเบียน",
          "uri": "https://liff.line.me/"+process.env.RB_LIFF_REGISTER
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
}

const menu = {
  "type": "bubble",
  "size": "mega",
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "primary",
        "height": "md",
        "action": {
          "type": "uri",
          "label": "Admin Menu",
          "uri": "https://liff.line.me/"+process.env.RB_LIFF_ADMIN
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
}

module.exports = {
  register,
  menu
}
