const fs = require('fs');
const cheerio = require('cheerio');
const { Client } = require('pg');

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

const client = new Client({
  host: 'db.riikozdctnkhklhbqgwz.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'PW5CKiRn7gYEYru3',
});

async function scrapeCharityWatch() {
  // const html = fs.readFileSync('./files/Trust for Public Land _ Charity Ratings _ Donating Tips _ Best Charities _ CharityWatch.html', 'utf8');
  const html = fs.readFileSync('./files/Our Generation _ Charity Ratings _ Donating Tips _ Best Charities _ CharityWatch.html', 'utf8');
  const $ = cheerio.load(html);

  const contactInfo = $('h3:contains("Contact Information")').next().text().trim()
  const otherNames = $('h3:contains("Other Names")').next().text().trim()
  const taxStatus = $('h3:contains("Tax Status")').next().text().trim()
  const statedMission = $('h3:contains("Stated Mission")').next().text().trim()

  const grade = $('div.title:contains("Grade")').prev().text().trim()
  const programPercentage = $('h3:contains("Program Percentage")').text().split(':')[1]
  const costToRaise = $('h3:contains("Cost to Raise $100:") span').text()

  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogUrl = $('meta[property="og:url"]').attr('content');

  



  console.log(`
    ogTitle: ${ogTitle}
    ogUrl: ${ogUrl}
    contactInfo : ${contactInfo}
    otherNames : ${otherNames}
    taxStatus : ${taxStatus}
    statedMission : ${statedMission}
    grade : ${grade}
    programPercentage : ${programPercentage}
    costToRaise : ${costToRaise}
  `)
}

scrapeCharityWatch();

