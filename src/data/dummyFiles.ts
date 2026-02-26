// This is a placeholder data for the file view in the dashboard.
// In a real application, this would likely fetch and display a list of files from an

// API or local storage. For now, we'll just display some static data.
export const files: {
    header: string[],
    data: {
        name: string,
        type: string,
        size: string,
        modified: string
    }[]
} = {
    header: ['name', 'type', 'size', 'modified'],
    data: [
        {
            name: "Resume_John_Doe.pdf",
            type: "pdf",
            size: "85 KB",
            modified: "2026-02-20 09:12 AM"
        },
        {
            name: "Invoice_2026-02-15.pdf",
            type: "pdf",
            size: "32 KB",
            modified: "2026-02-15 03:45 PM"
        },
        {
            name: "Meeting_Notes_2026-02-18.docx",
            type: "document",
            size: "24 KB",
            modified: "2026-02-18 11:00 AM"
        },
        {
            name: "Q1_Financials.xlsx",
            type: "spreadsheet",
            size: "1.2 MB",
            modified: "2026-01-31 05:20 PM"
        },
        {
            name: "Product_Photo_Shoes.jpg",
            type: "image",
            size: "3.4 MB",
            modified: "2026-02-10 02:10 PM"
        },
        {
            name: "Screenshot_2026-02-22.png",
            type: "image",
            size: "1.1 MB",
            modified: "2026-02-22 08:05 AM"
        },
        {
            name: "Marketing_Video_Ad.mp4",
            type: "video",
            size: "45 MB",
            modified: "2026-02-12 06:30 PM"
        },
        {
            name: "app.bundle.js",
            type: "code",
            size: "420 KB",
            modified: "2026-02-21 12:00 PM"
        },
        {
            name: "logo.svg",
            type: "image",
            size: "14 KB",
            modified: "2026-02-05 09:00 AM"
        },
        {
            name: "backup_2026-02-01.tar.gz",
            type: "archive",
            size: "780 MB",
            modified: "2026-02-01 01:00 AM"
        },
        {
            name: "design-system.sketch",
            type: "design",
            size: "4.8 MB",
            modified: "2026-01-20 04:45 PM"
        },
        {
            name: "projects",
            type: "folder",
            size: "—",
            modified: "2026-01-01 08:00 AM"
        },
        {
            name: "Proposal_Vendor_A.docx",
            type: "document",
            size: "96 KB",
            modified: "2026-02-14 10:30 AM"
        },
        {
            name: "Annual_Report_2025.pdf",
            type: "pdf",
            size: "2.1 MB",
            modified: "2026-01-15 09:00 AM"
        },
        {
            name: "Database_Backup_2026-02-25.sql.gz",
            type: "archive",
            size: "1.4 GB",
            modified: "2026-02-25 02:00 AM"
        },
        {
            name: "Client_List.csv",
            type: "spreadsheet",
            size: "18 KB",
            modified: "2026-02-23 04:10 PM"
        },
        {
            name: "Investor_Deck_Final.pdf",
            type: "presentation",
            size: "6.8 MB",
            modified: "2026-02-19 01:22 PM"
        },
        {
            name: "Contract_Client_XYZ.pdf",
            type: "pdf",
            size: "110 KB",
            modified: "2026-02-11 09:30 AM"
        }
    ]
}
