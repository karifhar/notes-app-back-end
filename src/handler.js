const { nanoid } = require('nanoid');
const notes = require('./notes');

// Create
const addNotehandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })

  response.code(500);
  return response;
};

// READ
const getAllNotesHandler = () => (
  {
    status: 'success',
    data: {
      notes
    }
  }
);

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      message: 'catatan berhasil ditemukan',
      data: {
        note
      }
    };
  };

  const response = h.response({
    status: 'fail',
    message: 'catatan gagal ditemukan'
  });

  response.code(404);
  return response;
};

// UPDATE
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbarui, id tidak ditemukan'
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Cacatan gagal dihapus'
  });
  response.code(404);
  return response;
}

module.exports = { 
  addNotehandler, 
  getAllNotesHandler,
  getNoteByIdHandler, 
  editNoteByIdHandler,
  deleteNoteByIdHandler
};