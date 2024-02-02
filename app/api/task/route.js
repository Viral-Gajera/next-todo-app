import query from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    let result = await query("SELECT * FROM tasks");
    return NextResponse.json({ is_success: true, message: "", data: result });
}

export async function POST(request) {
    let { task } = await request.json();
    let result = await query("INSERT INTO tasks (task) VALUES (?)", [task]);
    return NextResponse.json({
        is_success: true,
        message: "",
        data: {
            id: result.insertId,
            task: task,
            status: 0,
        },
    });
}

export async function PUT(request) {
    let { id, task } = await request.json();
    console.log(id, task);
    let result = await query("UPDATE tasks SET task=? WHERE id=?", [task, id]);
    return NextResponse.json({
        is_success: true,
        message: "",
        data: {
            id: id,
            task: task,
        },
    });
}

export async function PATCH(request) {
    let { id, status } = await request.json();
    console.log(id, status);
    let result = await query("UPDATE tasks SET status=? WHERE id=?", [
        status,
        id,
    ]);
    return NextResponse.json({
        is_success: true,
        message: "",
        data: {
            id: id,
            status: status,
        },
    });
}

export async function DELETE(request) {
    let { id } = await request.json();
    let result = await query("DELETE FROM tasks WHERE id = ?", [id]);
    return NextResponse.json({
        is_success: true,
        message: "",
        data: {
            id: id,
        },
    });
}
