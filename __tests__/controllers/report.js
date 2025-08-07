import volunteerController from "../../controllers/volunteer.js";
import PDFDocument, { fontSize, moveDown } from "pdfkit";
import fs from "fs";
import csvWriter from "csv-writer";
import reportController from "../../controllers/report.js";
import jwt from "../../helpers/jwt.js";

jest.mock('../../helpers/jwt.js');
jest.mock('../../controllers/db.js');
jest.mock('../../models/volunteer.js');
jest.mock('../../models/volunteerHistory.js');
jest.mock('../../models/event.js');

jest.mock("pdfkit", () => {
    return jest.fn().mockImplementation(() => {
        const mockDoc = {
            pipe: jest.fn().mockReturnThis(),
            text: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis(),
            fontSize: jest.fn().mockReturnThis(),
            font: jest.fn().mockReturnThis(),
            moveDown: jest.fn().mockReturnThis(),
            table: jest.fn().mockReturnThis()
        };
        return mockDoc;
    });
});

jest.mock("csv-writer", () => {
    const mockWriter = {
        writeRecords: jest.fn().mockReturnThis()
    };
    return {
        createObjectCsvWriter: jest.fn().mockReturnValue(mockWriter)
    };
});

// exportVolunteerPdf
test("reportController.exportVolunteerPdf", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportVolunteerPdf(req, res);
    expect(res.statusCode).toBe(200);
});

// exportVolunteerCsv
test("reportController.exportVolunteerPdf", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportVolunteerCsv(req, res);
    expect(res.statusCode).toBe(200);
});

// exportEventPdf
test("reportController.exportEventPdf", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        params: {
            id: "1"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportEventPdf(req, res);
    expect(res.statusCode).toBe(200);
});

test("reportController.exportEventPdf - error 1", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        params: {
            id: "3"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportEventPdf(req, res);
    expect(res.statusCode).not.toBe(200);
});

test("reportController.exportEventPdf - error 2", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        params: {
            id: "2"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportEventPdf(req, res);
    expect(res.statusCode).not.toBe(200);
});

// exportEventCsv
test("reportController.exportEventCsv", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        params: {
            id: "1"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportEventCsv(req, res);
    expect(res.statusCode).toBe(200);
});

test("reportController.exportEventCsv - error 1", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        params: {
            id: "3"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportEventCsv(req, res);
    expect(res.statusCode).not.toBe(200);
});

test("reportController.exportEventCsv - error 1", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        params: {
            id: "2"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await reportController.exportEventCsv(req, res);
    expect(res.statusCode).not.toBe(200);
});

// download
test("reportController.download", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        query: {
            token: jwt.sign({
                fileName: "fileName"
            })
        },
        params: {
            id: "2"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
        download: jest.fn().mockReturnThis()
    };
    let data = await reportController.download(req, res);
    expect(res.download).toHaveBeenCalled();
});

test("reportController.download - error 1", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        query: {
            token: null
        },
        params: {
            id: "2"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
        download: jest.fn().mockReturnThis()
    };
    let data = await reportController.download(req, res);
    expect(res.download).not.toHaveBeenCalled();
});

test("reportController.download - error 2", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        query: {
            token: "invalid token"
        },
        params: {
            id: "2"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
        download: jest.fn().mockReturnThis()
    };
    let data = await reportController.download(req, res);
    expect(res.download).not.toHaveBeenCalled();
});

test("reportController.download - error 3", async () => {
    let doc = new PDFDocument();
    let spy = jest.spyOn(doc, "end").mockImplementation(() => {});
    let req = {
        query: {
            token: jwt.sign({
            })
        },
        params: {
            id: "2"
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
        download: jest.fn().mockReturnThis()
    };
    let data = await reportController.download(req, res);
    expect(res.download).not.toHaveBeenCalled();
});
