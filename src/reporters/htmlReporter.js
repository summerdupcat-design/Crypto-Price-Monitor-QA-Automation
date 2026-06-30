const fs = require("fs");
const path = require("path");

const reportPath = path.join(__dirname, "../../reports/report.html");

function getStatus(result) {
    if (result.status === "SKIP") {
        return "SKIP";
    }

    return result.passed ? "PASS" : "FAIL";
}

function getStatusClass(result) {
    const status = getStatus(result);

    if (status === "PASS") return "pass";
    if (status === "FAIL") return "fail";
    return "skip";
}

function formatPercent(value) {
    if (value === undefined || value === null || Number.isNaN(value)) {
        return "-";
    }

    return `${(value * 100).toFixed(2)}%`;
}

function generateStyles() {
    return `
        <style>
            body {
                margin: 0;
                padding: 40px;
                font-family: Arial, Helvetica, sans-serif;
                background: #f4f6f8;
                color: #222;
            }

            .container {
                max-width: 1100px;
                margin: 0 auto;
            }

            .page-title {
                margin-bottom: 24px;
                padding: 28px;
                background: #111827;
                color: white;
                border-radius: 12px;
            }

            .page-title h1 {
                margin: 0;
                font-size: 30px;
            }

            .report-card {
                background: white;
                padding: 24px;
                border-radius: 12px;
                margin-bottom: 24px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            .summary {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
                margin-bottom: 20px;
            }

            .summary div {
                background: #f9fafb;
                padding: 14px;
                border-radius: 10px;
                border: 1px solid #e5e7eb;
            }

            .summary span {
                display: block;
                color: #6b7280;
                font-size: 13px;
                margin-bottom: 6px;
            }

            .summary strong {
                font-size: 16px;
                color: #111827;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 16px;
            }

            th {
                background: #374151;
                color: white;
                text-align: left;
                padding: 12px;
            }

            td {
                border-bottom: 1px solid #e5e7eb;
                padding: 12px;
            }

            .pass {
                color: #16a34a;
                font-weight: bold;
            }

            .fail {
                color: #dc2626;
                font-weight: bold;
            }

            .skip {
                color: #d97706;
                font-weight: bold;
            }

            .benchmark-detail {
                margin-top: 24px;
            }

            .detail-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
                margin-top: 12px;
            }

            .detail-grid div {
                background: #f9fafb;
                padding: 16px;
                border-radius: 10px;
                border: 1px solid #e5e7eb;
            }

            .detail-grid span {
                display: block;
                color: #6b7280;
                font-size: 13px;
                margin-bottom: 8px;
            }

            .detail-grid strong {
                font-size: 18px;
                color: #111827;
            }
        </style>
    `;
}

function generatePage(content) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Crypto Price Monitor QA Report</title>
    ${generateStyles()}
</head>
<body>
    <div class="container">
        <div class="page-title">
            <h1>Crypto Price Monitor QA Report</h1>
        </div>

        ${content}
    </div>
</body>
</html>
`;
}

function generateResultTable(results) {
    const rows = results.map((result) => {
        const status = getStatus(result);
        const statusClass = getStatusClass(result);

        return `
            <tr>
                <td>${result.validator}</td>
                <td class="${statusClass}">${status}</td>
                <td>${result.reason || ""}</td>
            </tr>
        `;
    }).join("");

    return `
        <table>
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
    `;
}

function generateBenchmarkDetail(results) {
    const benchmarkResult = results.find(
        result => result.validator === "BenchmarkValidator"
    );

    if (!benchmarkResult || !benchmarkResult.data) {
        return "";
    }

    const {
        currentPrice,
        benchmarkPrice,
        deviation,
        threshold
    } = benchmarkResult.data;

    return `
        <div class="benchmark-detail">
            <h3>Benchmark Detail</h3>

            <div class="detail-grid">
                <div>
                    <span>Current Price</span>
                    <strong>${currentPrice ?? "-"}</strong>
                </div>

                <div>
                    <span>Benchmark Price</span>
                    <strong>${benchmarkPrice ?? "-"}</strong>
                </div>

                <div>
                    <span>Deviation</span>
                    <strong>${formatPercent(deviation)}</strong>
                </div>

                <div>
                    <span>Threshold</span>
                    <strong>${formatPercent(threshold)}</strong>
                </div>
            </div>
        </div>
    `;
}

function generateReportCard(ticker, results) {
    const reportTime = new Date().toLocaleString();

    return `
        <section class="report-card">
            <div class="summary">
                <div>
                    <span>Time</span>
                    <strong>${reportTime}</strong>
                </div>

                <div>
                    <span>Exchange</span>
                    <strong>${ticker.exchange}</strong>
                </div>

                <div>
                    <span>Symbol</span>
                    <strong>${ticker.symbol}</strong>
                </div>

                <div>
                    <span>Price</span>
                    <strong>${ticker.price}</strong>
                </div>
            </div>

            ${generateResultTable(results)}
            ${generateBenchmarkDetail(results)}
        </section>
    `;
}

function ensureReportsDir() {
    const reportsDir = path.join(__dirname, "../../reports");

    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir);
    }
}

function generateHtmlReport(ticker, results) {
    ensureReportsDir();

    const newCard = generateReportCard(ticker, results);

    if (!fs.existsSync(reportPath)) {
        fs.writeFileSync(reportPath, generatePage(newCard));
        return;
    }

    const oldHtml = fs.readFileSync(reportPath, "utf8");

    const updatedHtml = oldHtml.replace(
        '<div class="page-title">',
        `${newCard}\n        <div class="page-title">`
    );

    fs.writeFileSync(reportPath, updatedHtml);
}

module.exports = {
    generateHtmlReport
};