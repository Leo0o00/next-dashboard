import { connectionPool} from "@/db";

async function listInvoices(){
    return await connectionPool.query(`
        SELECT invoices.amount, customers.name
        FROM invoices
                 JOIN customers ON invoices.customer_id = customers.id
        WHERE invoices.amount = 666;
`);
}

export async function GET() {

  try {
    const result = await listInvoices();

    return Response.json({ message: 'Database seeded successfully', data: result.rows, _count: result.rowCount });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}