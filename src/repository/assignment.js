const assignment = (db) => {
  const create = async (data, tags) => {
    const result = JSON.parse(JSON.stringify(await db.Assignment.create(data)));
    const tagList = tags.map((val, id) => ({
      assignmentId: result.id,
      name: val,
    }));
    const insertedTags = JSON.parse(
      JSON.stringify(await db.Tags.bulkCreate(tagList)),
    );

    result.tags = insertedTags;
    return result;
  };

  const searchTag = async (tag) => {
    const result = await db.Tags.findAll({
      where: {
        name: tag,
      },
      include: [db.Assignment],
    });
    return result;
  };

  const getByID = async (id) => {
    const result = await db.Assignment.findOne({ where: { id } });
    if (result == null) {
      return { message: 'no records found' };
    } else {
      return result;
    }
  };
  return {
    create,
    getByID,
    searchTag,
  };
};

module.exports = assignment;
