const puppeteer = require('puppeteer');
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
  await client.connect();
  const browser = await puppeteer.launch({headless: false});

  for (let i = 1; i <= 1 /* 61 */; i++) {
    const page = await browser.newPage();
    await page.goto(`https://www.charitywatch.org/charities?search=&category=all&letter=all&page=${i}`);

    await page.waitForSelector('#charities > div > div > div.table-responsive.bg-white > table > tbody > tr:nth-child(1) > td:nth-child(1) > a')
    const charities = await page.$$eval('table tbody tr', rows => rows.map(row => row.querySelector('a').href));
    await delay(1234);  
    console.log('delay')

    for (let j = 0; j < charities.length; j++) {      
      await delay(1234);
      console.log('delay')
      
      const selector = `a[href="${charities[j]}"]`
      console.log('selector')
      await page.click(selector);
      console.log('click')
      
      await page.waitForNavigation();
      console.log('wait for nav')
  
      await delay(1234);
      console.log('delay')

      const contactInfo = await charityPage.$eval('#contact-info', el => el.textContent);
      console.log(contactInfo)
      const otherNames = await charityPage.$eval('#other-names', el => el.textContent);
      console.log(otherNames)
      const website = await charityPage.$eval('#website', el => el.href);
      console.log(website)
      const taxStatus = await charityPage.$eval('#tax-status', el => el.textContent);
      console.log(taxStatus)
      const statedMission = await charityPage.$eval('#stated-mission', el => el.textContent);
      console.log(statedMission)
      const grade = await charityPage.$eval('#grade', el => el.textContent);
      console.log(grade)
      const programPercentage = await charityPage.$eval('#program-percentage', el => el.textContent);
      console.log(programPercentage)
      const costToRaise = await charityPage.$eval('#cost-to-raise', el => el.textContent);

      console.log(`
        contactInfo : ${contactInfo}
        otherNames : ${otherNames}
        website : ${website}
        taxStatus : ${taxStatus}
        statedMission : ${statedMission}
        grade : ${grade}
        programPercentage : ${programPercentage}
        costToRaise : ${costToRaise}
      `)

      // await client.query('INSERT INTO charities (contact_info, other_names, website, tax_status, stated_mission, grade, program_percentage, cost_to_raise) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [contactInfo, otherNames, website, taxStatus, statedMission, grade, programPercentage, costToRaise]);
      await charityPage.close();
    }
    await page.close();
  }
  await browser.close();
  await client.end();
}

scrapeCharityWatch();
