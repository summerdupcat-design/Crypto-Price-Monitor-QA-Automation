const fs = require("fs");
const path = require("path");

function generateHtmlReport(ticker, results) {
    const rows = results.map((result) => {
        const status = result.status === 'SKIP' || result.passed === null
            ? '⏭️ SKIP'
            : result.passed
                ? '✅ PASS'
                : '❌ FAIL';

        return `
            <tr>
                <td>${result.validator}</td>
                <td>${status}</td>
                <td>${result.reason || ""}</td>
            </tr>
        `;
    }).join("");

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Market Data Validation Report</title>
</head>
<body>
    <h1>Market Data Validation Report</h1>
    <h2>${ticker.exchange} - ${ticker.symbol}</h2>

    <table border="1" cellpadding="8" cellspacing="0">
        <thead>
            <tr>
                <th>Validator</th>
                <th>Status</th>
                <th>Reason</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
</body>
</html>
`;

    const reportDir = path.join(__dirname, '../../reports');
    const reportPath = path.join(reportDir, 'report.html');
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(reportPath, html);
}

module.exports = {
    generateHtmlReport
};